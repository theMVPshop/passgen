//To isolate API-related logic, including the actual fetch call.
// require('dotenv').config()

async function fetchImage(prompt) {
    const form = new FormData();
    // put prompt variable as second argument in the next line
    form.append('prompt', 'Bill Gates, eating sushi, in a purple hoodie, at the forest, pixar, vibrant, long shot angle, soft smooth lighting');
    form.append('samples', '4');
    form.append('negprompt', 'deformed, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, disgusting, poorly drawn hands, missing limb, floating limbs, disconnected limbs, malformed hands, blurry, mutated hands, fingers');
    form.append('style', '3d-model');

    let body = {
        prompt: 'Bill Gates, eating sushi, in a purple hoodie, at the forest, pixar, vibrant, long shot angle, soft smooth lighting',
        samples: '4',
        negprompt: 'deformed, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, disgusting, poorly drawn hands, missing limb, floating limbs, disconnected limbs, malformed hands, blurry, mutated hands, fingers',
        style: '3d-model'
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
            },
        body: JSON.stringify(form)
        };
    console.log(options.body)
    try {
        const res = await fetch("http://localhost:5000/", options)
        if (!res.ok) {
            throw new Error(`Failed to fetch. Status code: ${res.status}`);
          }
        const data = await res.json()
        console.log(data)
        } catch (err) {
            console.log(err)
        }
}

async function imageFetch (prompt) {
    // const token = process.env.MONSTER_API_KEY
    const form = new FormData();
    // put prompt variable as second argument in the next line
    form.append('prompt', 'Bill Gates, eating sushi, in a purple hoodie, at the forest, pixar, vibrant, long shot angle, soft smooth lighting');
    form.append('samples', '1');
    form.append('negprompt', 'deformed, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, disgusting, poorly drawn hands, missing limb, floating limbs, disconnected limbs, malformed hands, blurry, mutated hands, fingers');
    form.append('style', '3d-model');

    const options = {
    method: 'POST',
    headers: {
        accept: 'application/json', 
        authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJjYWYyZjI3ZGJmZDk1MTEyZDcyYTI0N2M2YTY1NjVjIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMTRUMjM6MDI6MzYuNzQ2NDE5In0.r21gAOrQFeNuUP_0xs_VwFcPSf2_yAWeBzdEn9hyX58`
    }
    };

    options.body = form;
    const url = " https://api.monsterapi.ai/v1/generate/txt2img"
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
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'multipart/form-data',
                    authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJjYWYyZjI3ZGJmZDk1MTEyZDcyYTI0N2M2YTY1NjVjIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMTRUMjM6MDI6MzYuNzQ2NDE5In0.r21gAOrQFeNuUP_0xs_VwFcPSf2_yAWeBzdEn9hyX58`
                    }
                };
            try {
                const res2 = await fetch(statusURL, statusOptions)
                if (!res2.ok) {
                    throw new Error(`Failed to fetch. Status code: ${res2.status}`);
                  }
                const data2 = await res2.json()
                const status = data2.status
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
                } catch(err) {
                    completed = true
                    console.log(err)}
        }
        console.log(images)
    } catch (err) {
        console.log(`An error occured with the first await: ${err}`)
    }
}
