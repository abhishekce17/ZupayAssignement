//Required Parameter : FormData with "file" key and value should be an image file
export default async function uploader(formData) {
    try {
        // const configRequest = await fetch(`/api/configuration/cloudinary`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": 'application/json',
        //     }
        // });
        // const response = await configRequest.json();
        // // const data = response;
        // if (response.status === 500) {
        //     return { status: 500, error: data }
        // }
        const config = {
            cloudinaryCloudName: "dnbfy78fe",
            uploadPreset: "img3q8gt"
        };
        const imageArray = formData.getAll("file")
        let imgLink = [];
        if (imageArray.length) {
            const imgURLPromise = Promise.all(
                imageArray.map(async (element) => {
                    try {
                        const newFormData = new FormData();
                        newFormData.append("file", element);
                        newFormData.append("upload_preset", config.uploadPreset)
                        const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudinaryCloudName}/upload`, {
                            method: "POST",
                            body: newFormData,
                        });
                        const result = await response.json();
                        return result.secure_url;
                    } catch (error) {
                        throw error;
                    }
                })
            );
            imgLink = await imgURLPromise;
        }
        return { status: 200, imgLinkArray: imgLink };
    } catch (error) {
        return { status: 500, error }
    }
}