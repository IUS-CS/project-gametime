


export default async function Authentication(token: string ) {
    try {
        
        const res = await fetch(`http://127.0.0.1:8000/gametime/user/auth/`, {
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




