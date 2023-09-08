
// imageFetch takes in a prompt, and returns an array of links to the hosted images.
// It takes awhile to come back, so console logs keep track of the progress.
// You should await the resolution of this function, then do something with the returned array.
export async function imageFetch (prompt, controller) {
    const token = ""
    const form = new FormData();
    // put prompt variable as second argument in the next line
    form.append('prompt', `${prompt}`);
    form.append('samples', '4');
    form.append('negprompt', 'deformed, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, disgusting, poorly drawn hands, missing limb, floating limbs, disconnected limbs, malformed hands, blurry, mutated hands, fingers');
    form.append('style', '3d-model');

    const options = {
    method: 'POST',
    signal: controller.signal,
    headers: {
        accept: 'application/json', 
        authorization: `Bearer ${token}`
    }
    };

    options.body = form;
    const url = "https://api.monsterapi.ai/v1/generate/sdxl-base"
    try {
        const res = await fetch(url, options)
        if (!res.ok) {
            // console.log(res.json())
            // if(res.status == 403) {
            //     alert("The host needs to add more credits to their account in order for image generation to work!")
            // }
            throw new Error(`Failed to fetch. Status code: ${res.status}`);
          }
        const data = await res.json()
        let completed = false
        let images = []
        const statusURL = data.status_url
        while (!completed) {
            const statusOptions = {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    accept: 'application/json',
                    'content-type': 'multipart/form-data',
                    authorization: `Bearer ${token}`
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
                        images = data2.result.output
                        console.log(images)
                        break;
                    default:
                        completed = true
                        console.log("Your switch statement doesn't work.")
                }
                } catch(err) {
                    completed = true
                    console.log(`An error occurred within the second await: ${err}`)}
        }
        return images
    } catch (err) {
        console.log(`An error occured with the first await: ${err}`)
    }
}
