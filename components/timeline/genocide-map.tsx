'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import {
  camps,
  Camp,
  CampType,
  campTypeInfo,
  getCampMarkerSize,
  formatDeaths,
  getTotalDeaths,
  getMostDeadlyCamp,
} from '@/lib/camp-data';
import { CampModal } from './camp-modal';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Europe bounding box for initial view
const europeCenter: [number, number] = [15, 50];
const defaultZoom = 4;

interface TooltipData {
  camp: Camp;
  x: number;
  y: number;
}

export function GenocideMap() {
  const [activeFilters, setActiveFilters] = useState<Record<CampType, boolean>>({
    death: true,
    concentration: true,
    transit: true,
    labor: false,
  });
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);
  const [position, setPosition] = useState({ coordinates: europeCenter, zoom: defaultZoom });

  const filteredCamps = useMemo(() => {
    return camps.filter(camp => activeFilters[camp.type]);
  }, [activeFilters]);

  const stats = useMemo(() => {
    const totalDeaths = getTotalDeaths(filteredCamps);
    const mostDeadly = getMostDeadlyCamp(filteredCamps);
    return {
      campCount: filteredCamps.length,
      totalDeaths,
      mostDeadly,
    };
  }, [filteredCamps]);

  const handleFilterToggle = useCallback((type: CampType) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  }, []);

  const handleMarkerHover = useCallback((camp: Camp, event: React.MouseEvent) => {
    const rect = (event.target as SVGElement).getBoundingClientRect();
    setTooltip({
      camp,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }, []);

  const handleMarkerLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const handleMarkerClick = useCallback((camp: Camp) => {
    setSelectedCamp(camp);
    setTooltip(null);
  }, []);

  const handleMoveEnd = useCallback((pos: { coordinates: [number, number]; zoom: number }) => {
    setPosition(pos);
  }, []);

  return (
    <section className="relative bg-[#0a0a0a] py-16 lg:py-24">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl lg:text-5xl text-[#e8e8e8] mb-4">
            Geography of Genocide
          </h2>
          <p className="text-lg text-[#888] max-w-2xl mx-auto">
            The network of camps across Nazi-occupied Europe, 1933-1945
          </p>
        </motion.div>
      </div>

      {/* Map Container */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="relative bg-[#0d0d0d] border border-[#1a1a1a] rounded-sm overflow-hidden">
          {/* Statistics Panel - Top Left */}
          <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-sm border border-[#2a2a2a] rounded-sm p-4 min-w-[200px]">
            <h3 className="text-xs uppercase tracking-wider text-[#666] mb-3">Statistics</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#888]">Camps Shown:</span>
                <span className="text-[#e8e8e8] font-medium tabular-nums">{stats.campCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Total Deaths:</span>
                <span className="text-[#e8e8e8] font-medium tabular-nums">~{formatDeaths(stats.totalDeaths)}</span>
              </div>
              {stats.mostDeadly && (
                <div className="flex justify-between">
                  <span className="text-[#888]">Most Deadly:</span>
                  <span className="text-[#dc2626] font-medium text-xs">{stats.mostDeadly.name}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#888]">Peak Operation:</span>
                <span className="text-[#e8e8e8] font-medium">1942-1944</span>
              </div>
            </div>
          </div>

          {/* Filters - Top Right */}
          <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-sm border border-[#2a2a2a] rounded-sm p-4">
            <h3 className="text-xs uppercase tracking-wider text-[#666] mb-3">Filter Camps</h3>
            <div className="space-y-2">
              {(Object.keys(campTypeInfo) as CampType[]).map(type => (
                <label
                  key={type}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters[type]}
                    onChange={() => handleFilterToggle(type)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-colors ${
                      activeFilters[type]
                        ? 'border-transparent'
                        : 'border-[#444] group-hover:border-[#666]'
                    }`}
                    style={{
                      backgroundColor: activeFilters[type] ? campTypeInfo[type].color : 'transparent',
                    }}
                  >
                    {activeFilters[type] && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-[#aaa] group-hover:text-[#e8e8e8] transition-colors">
                    {campTypeInfo[type].label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Legend - Bottom Left */}
          <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-sm border border-[#2a2a2a] rounded-sm p-4">
            <h3 className="text-xs uppercase tracking-wider text-[#666] mb-3">Legend</h3>
            <div className="space-y-2">
              {(Object.keys(campTypeInfo) as CampType[]).map(type => (
                <div key={type} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: campTypeInfo[type].color }}
                  />
                  <span className="text-xs text-[#888]">{campTypeInfo[type].label}</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-[#2a2a2a]">
                <p className="text-[10px] text-[#666] italic">Circle size = death toll</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] lg:h-[600px]">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                center: europeCenter,
                scale: 600,
              }}
              style={{ width: '100%', height: '100%' }}
            >
              <ZoomableGroup
                center={position.coordinates}
                zoom={position.zoom}
                onMoveEnd={handleMoveEnd}
                minZoom={2}
                maxZoom={10}
              >
                {/* Base Map */}
                <Geographies geography={geoUrl}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo: any) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#1a1a1a"
                        stroke="#2a2a2a"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: 'none' },
                          hover: { outline: 'none', fill: '#222' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Camp Markers */}
                {filteredCamps.map(camp => {
                  const size = getCampMarkerSize(camp.deaths);
                  const color = campTypeInfo[camp.type].color;
                  // Normalize size for zoom level
                  const normalizedSize = Math.max(size / (position.zoom * 0.8), 3);

                  return (
                    <Marker
                      key={camp.id}
                      coordinates={camp.coordinates}
                      onMouseEnter={(e) => handleMarkerHover(camp, e as unknown as React.MouseEvent)}
                      onMouseLeave={handleMarkerLeave}
                      onClick={() => handleMarkerClick(camp)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Main marker - solid circle, no blur */}
                      <circle
                        r={normalizedSize}
                        fill={color}
                        fillOpacity={0.85}
                        stroke="#000"
                        strokeWidth={2 / position.zoom}
                        className="transition-all duration-150 hover:fill-opacity-100"
                        style={{
                          filter: 'none',
                        }}
                      />
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1">
            <button
              onClick={() => setPosition(prev => ({ ...prev, zoom: Math.min(prev.zoom * 1.5, 10) }))}
              className="w-8 h-8 bg-black/80 border border-[#2a2a2a] rounded-sm flex items-center justify-center text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-colors"
              aria-label="Zoom in"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              onClick={() => setPosition(prev => ({ ...prev, zoom: Math.max(prev.zoom / 1.5, 2) }))}
              className="w-8 h-8 bg-black/80 border border-[#2a2a2a] rounded-sm flex items-center justify-center text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-colors"
              aria-label="Zoom out"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button
              onClick={() => setPosition({ coordinates: europeCenter, zoom: defaultZoom })}
              className="w-8 h-8 bg-black/80 border border-[#2a2a2a] rounded-sm flex items-center justify-center text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-colors"
              aria-label="Reset view"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Map Caption */}
        <p className="mt-4 text-center text-sm text-[#666] italic">
          Click on any camp marker for detailed information. Zoom and pan to explore.
        </p>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltip.x,
              top: tooltip.y - 10,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="bg-black/95 border border-[#2a2a2a] rounded-sm p-3 min-w-[200px] shadow-xl">
              <div className="flex items-start gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: campTypeInfo[tooltip.camp.type].color }}
                />
                <div>
                  <h4 className="text-sm font-semibold text-[#e8e8e8]">{tooltip.camp.name}</h4>
                  <p className="text-xs text-[#888]">{tooltip.camp.location}, {tooltip.camp.country}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#666]">Deaths:</span>
                  <span className="text-[#dc2626] font-medium ml-1">{tooltip.camp.deaths.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#666]">Dates:</span>
                  <span className="text-[#aaa] ml-1">{tooltip.camp.operationalDates}</span>
                </div>
              </div>
              <p className="text-[10px] text-[#555] mt-2 pt-2 border-t border-[#2a2a2a]">
                Click for more details
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camp Detail Modal */}
      <CampModal
        camp={selectedCamp}
        onClose={() => setSelectedCamp(null)}
      />
    </section>
  );
}
