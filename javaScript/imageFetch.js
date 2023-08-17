//To isolate API-related logic, including the actual fetch call.
require('dotenv').config()

async function imageFetch (prompt) {
    const token = process.env.MONSTER_API_KEY
    const form = new FormData();
    // put prompt variable as second argument in the next line
    form.append('prompt', 'Bill Gates, eating sushi, in a purple hoodie, at the forest, pixar, vibrant, long shot angle, soft smooth lighting');
    form.append('samples', '4');
    form.append('negprompt', 'deformed, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, disgusting, poorly drawn hands, missing limb, floating limbs, disconnected limbs, malformed hands, blurry, mutated hands, fingers');
    form.append('style', '3d-model');

    const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`
        }
    };

    options.body = form;
    const url = "https://api.monsterapi.ai/v1/generate/txt2img"
    try {
        const res = await fetch(url, options)
        if (!res.ok) {
            throw new Error(`Failed to fetch. Status code: ${res.status}`);
          }
        const data = await res.json()
        let completed = false
        let images = []
        const statusURL = data.status_url
        while (!completed) {
            const statusOptions = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${token}`
                    }
                };
            fetch(statusURL, statusOptions)
                .then(response => response.json())
                .then(response => {
                    const status = response.status
                    switch(status){
                        case "IN_PROGRESS":
                            console.log("rendering in progress")
                            break;
                        case "IN_QUEUE":
                            console.log("In render queue")
                            break;
                        case "FAILED":
                            completed = true
                            throw new Error("Request failed! The AI must be having some trouble today.")
                            break;
                        case "COMPLETED":
                            completed = true
                            images = response.result.output
                            break;
                        default:
                            completed = true
                            console.log("Your switch statement doesn't work.")
                    }
                }).catch(err => {
                    completed = true
                    console.log(err)})
        }
        return images
    } catch (err) {
        console.log(`An error occured with the first await: ${err}`)
    }
}

export default imageFetch