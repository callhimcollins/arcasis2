export default function extractArrayFromResponse(apiResponse: string): string[] {
    try {
        // Log the raw string for debugging
        console.log('Raw API response:', apiResponse);

        // Find anything that looks like an array
        const arrayRegex = /\[(.*?)\]/s;
        const match = apiResponse.match(arrayRegex);

        if (!match || !match[1]) {
            throw new Error('No array pattern found in the response');
        }

        // Split by comma, handling items that might contain commas within them
        const items = match[1].split(',').map(item => {
            // Clean each item
            return item
                .trim()                    // Remove leading/trailing whitespace
                .replace(/^["']/, '')      // Remove leading quotes if they exist
                .replace(/["']$/, '')      // Remove trailing quotes if they exist
                .replace(/\s+/g, ' ')      // Normalize whitespace
                .trim();                   // Final trim
        })
        .filter(item => item.length > 0);  // Remove empty items
        return items;
    } catch (error) {
        console.error('Error extracting array from response:', error instanceof Error ? error.message : error);
        throw error;
    }
}

export const extractObjectFromResponse = (apiResponse: string): Record<string, any> => {
    try {
        // First attempt: Try to find JSON content between ```json and ``` markers
        const jsonMatch = apiResponse.match(/```json\n([\s\S]*?)\n```/);
        
        if (jsonMatch && jsonMatch[1]) {
            return JSON.parse(jsonMatch[1]);
        }

        // Second attempt: Try to find any JSON object in the string
        const jsonObjectMatch = apiResponse.match(/({[\s\S]*})/);
        
        if (jsonObjectMatch && jsonObjectMatch[1]) {
            return JSON.parse(jsonObjectMatch[1]);
        }

        // If no JSON content is found
        throw new Error('No valid JSON content found in the response');
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error(`Invalid JSON format: ${error.message}`);
        }
        throw new Error(`Failed to extract JSON object: ${error}`);
    }
};