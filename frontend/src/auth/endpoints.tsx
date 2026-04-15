


export default async function Authentication(url: string, token: string ) {
    try {
        
        const res = await fetch(url, {
            headers: {
                "Authorization": `Token ${token.trim()}`,
                "Content-Type": "application/json"
            }
        })
        return res;


    } catch (err) {
        console.error("Account page error:", err);
        throw err;
    }

}




