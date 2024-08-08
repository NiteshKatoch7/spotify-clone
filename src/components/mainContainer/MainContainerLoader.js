import React from 'react'

export default function MainContainerLoader() {
  return (
    <div className="header-body">
      <div className="rounded-md w-full">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-6 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-slate-700 rounded col-span-1 mb-6"></div>
              </div>
              <div className="mb-6">
                <div className="img-container bg-slate-700 rounded mb-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
