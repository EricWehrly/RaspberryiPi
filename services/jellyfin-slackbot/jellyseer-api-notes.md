# Jellyseerr API Notes

## Authentication
- Requires API key in header: `X-Api-Key`
- API key generated in Jellyseerr settings / general

## Relevant Endpoints

### Search Media
- `GET /api/v1/search`
- Query params: 
  - `query` (string, required): Search term
  - `page` (integer, optional): Page number
  - `language` (string, optional): ISO 639-1 language code

### Request Media
- `POST /api/v1/request`
- Required body parameters:
  - `mediaType`: "movie" or "tv"
  - `mediaId`: TMDB ID of the media
- Optional parameters:
  - `seasons`: Array of season numbers (for TV)
  - `tvdbId`: TVDB ID (for TV shows)

## Example Flow
1. Search for media using title
2. Get TMDB ID from search results
3. Use TMDB ID to make request

## Required Environment Variables
- `JELLYSEERR_API_URL`: Base URL of Jellyseerr instance
- `JELLYSEERR_API_KEY`: API key from settings