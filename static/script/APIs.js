export async function apiGet(url) {
    let response = await fetch(url);
    if (response.ok) {
        let data = await response.json();
        return data;
    }
}

export async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        let data = await response.json();
        // console.log(data)
        return data;
    }
}

export async function apiDelete(url, payload) {
    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        let data = await response.json();
        return data;
    }
}

export async function apiPut(url, payload) {
    let response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        let data = await response.json();
        return data;
    }
}
