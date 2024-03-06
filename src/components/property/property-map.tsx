'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import { MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { fromAddress, OutputFormat, setDefaults } from 'react-geocode'
import Map, { Marker } from 'react-map-gl'

import { Property } from '@/data/types/property'

interface PropertyMapProps {
  property: Property
}

export default function PropertyMap({ property }: PropertyMapProps) {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [loading, setLoading] = useState(true)
  const [geocodeError, setGeocodeError] = useState(false)
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  })

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY || '',
    language: 'en',
    region: 'us',
    outputFormat: OutputFormat.JSON,
  })

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`,
        )

        if (res.results.length === 0) {
          setGeocodeError(true)
          setLoading(false)
        }

        const { lat, lng } = res.results[0].geometry.location

        setLatitude(lat)
        setLongitude(lng)
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        })
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }

    fetchCoords()
  }, [])

  return !loading ? (
    !geocodeError ? (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: longitude ?? 0,
          latitude: latitude ?? 0,
          zoom: 15,
        }}
        style={{
          width: '100%',
          height: 400,
        }}
        mapStyle={'mapbox://styles/mapbox/streets-v11'}
      >
        <Marker
          longitude={longitude ?? 0}
          latitude={latitude ?? 0}
          anchor="bottom"
        >
          <MapPin size={40} color="red" />
        </Marker>
      </Map>
    ) : (
      <div className="text-xl">No location data found</div>
    )
  ) : (
    <div>Loading...</div>
  )
}
