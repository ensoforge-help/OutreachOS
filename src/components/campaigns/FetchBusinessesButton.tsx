"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button" // Assuming shadcn/ui is being used
import { RefreshCw, Search } from "lucide-react"
import type { DiscoveryResult } from "@/types/discovery"

interface FetchBusinessesButtonProps {
  campaignId: string
  onComplete?: (result: DiscoveryResult) => void
}

export function FetchBusinessesButton({ campaignId, onComplete }: FetchBusinessesButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [result, setResult] = useState<DiscoveryResult>()

  const handleFetch = async () => {
    setIsLoading(true)
    setError(undefined)
    
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/discover`, {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch businesses")
      }

      setResult(data)
      if (onComplete) {
        onComplete(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button 
        onClick={handleFetch} 
        disabled={isLoading}
        className="w-full sm:w-auto"
      >
        {isLoading ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Discovering...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Fetch Businesses
          </>
        )}
      </Button>

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}

      {result && (
        <div className="text-sm bg-muted p-4 rounded-md mt-2 space-y-1">
          <p className="font-semibold mb-2">Discovery Results:</p>
          <p>Found: {result.count}</p>
          <p className="text-green-600">New Leads: {result.newCount}</p>
          <p className="text-muted-foreground">Duplicates Skipped: {result.duplicateCount}</p>
          {result.errorCount > 0 && (
             <p className="text-red-500">Errors: {result.errorCount} ({result.errorMessage})</p>
          )}
        </div>
      )}
    </div>
  )
}
