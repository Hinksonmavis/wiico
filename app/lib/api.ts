const API_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:5000/api/v1";


if (!API_URL) {
    throw new Error(
        "NEXT_PUBLIC_API_URL is not defined"
    );
}


export async function apiGet(
    endpoint:string
) {
    const response =
        await fetch(
            `${API_URL}${endpoint}`,
            {
                method:"GET",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json",
                },
            }
        );

    const data = await response.json();

    if(!response.ok){
        throw new Error(
            data.message ||
            "API request failed"
        );
    }

    return data;
}