// Thin wrapper around the Rainy Days API (v2.api.noroff.dev).

const API_BASE_URL = "https://v2.api.noroff.dev/rainy-days";

/** Throw for any failed request so code can show a error message. */
export class ApiError extends Error {}

/** Fetches every product in the Rainy Days catalogue. 
* @returns {Promise<Array<Object>>}
*/
export async function fetchProducts() {
    let response;

    try {
        response = await fetch(API_BASE_URL);
    } catch (networkError) {
        throw new ApiError(
            "We couldn't reach the Rainy Days store. Check your internet connection and try again."
        );
    }

    if (!response.ok) { 
        throw new ApiError(`Could not load products (server responded with ${response.status})`);
    }

    const body= await response.json();
    return body.data;
}

/**
 * Fetches a single product by its ID.
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export async function fetchProductById(id) {
    let response;

    try {
        response = await fetch(`${API_BASE_URL}/${id}`);
    } catch (networkError) {
        throw new ApiError(
            "We couldn't reach the Rainy Days store. Check your internet connection and try again."
        );
    }

    if (!response.ok) { 
        throw new ApiError(
            response.status === 404 
            ? "This product could not be found. It may have been removed."
            : `Could not load this product (server responded with ${response.status}).`
        );
    }

    const body= await response.json();
    return body.data;
}

