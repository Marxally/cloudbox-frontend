// src/api/gameApi.js - CloudBox Game API Client

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetches games from the CloudBox backend API
 */
export async function fetchGames(refresh = false, limit = null) {
    try {
        let url = `${API_BASE_URL}/games`;
        const params = [];
        
        if (refresh) params.push('refresh=true');
        if (limit) params.push(`limit=${limit}`);
        
        if (params.length > 0) {
            url += '?' + params.join('&');
        }
        
        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            return data.games || [];
        } else {
            console.warn('API not available, using fallback data');
            return getFallbackGames();
        }
    } catch (error) {
        console.warn('Network error:', error.message);
        return getFallbackGames();
    }
}

/**
 * Force refresh games from scraper
 */
export async function refreshGames() {
    try {
        const response = await fetch(`${API_BASE_URL}/refresh`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Refresh failed:', error);
    }
    return null;
}

/**
 * Get statistics
 */
export async function getStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/stats`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Failed to get stats:', error);
    }
    return null;
}

/**
 * Fallback games data
 */
function getFallbackGames() {
    return [
        {
            id: '1',
            title: 'Cyberpunk 2077',
            service: 'gfn',
            imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7y.jpg',
            description: 'An open-world RPG set in Night City',
            publisher: 'CD Projekt Red',
            genre: 'RPG',
            year: 2020,
            score: 8.5,
            url: 'https://www.nvidia.com/en-us/geforce-now/games/',
            color: 'from-green-400 to-green-700'
        },
        {
            id: '2',
            title: 'Halo Infinite',
            service: 'xbox',
            imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4rq7.jpg',
            description: 'The next chapter in the Halo saga',
            publisher: 'Xbox Game Studios',
            genre: 'Shooter',
            year: 2021,
            score: 9.0,
            url: 'https://www.xbox.com/en-US/play/games/halo-infinite',
            color: 'from-blue-400 to-blue-700'
        }
    ];
}
