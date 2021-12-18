const SERVER_URL='http://localhost:5000/api'
const api_obj = {
    POST_STPRY_TEMPLATE: 'story_template'
}
export const fetchStoryTemplate = async(data)=>{
    console.log("daata",data,typeof data,JSON.stringify(data),typeof JSON.stringify(data))
    let res = await fetch(`${SERVER_URL}/${api_obj.POST_STPRY_TEMPLATE}`,{
        method:"post",
        headers: {
            'Content-Type': 'application/json'},
            mode: 'no-cors',
            body:JSON.stringify(data)

    });

    console.log("res",res)
}