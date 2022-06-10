 export const getnotes = (data) => {


     console.log(data)

     return ({
         type: "SET_ALL_NOTES",
         payload: {
             'notes': data.notes,
             'totalDocuments': data.totalDocument
         }
     })

 }


 export const setPage = (page) => {

     return ({
         type: "SET_PAGE",
         payload: page
     })
 }


 export const set_title_Body = (_id, title, body) => {

     return {
         type: "SET_TB",
         payload: { 'title': title, 'body': body, '_id': _id }
     }
 }

 export const update_title_Body = (title, body) => {

     return {
         type: 'Edit_title_body',
         payload: {
             title,
             body
         }
     }
 }

 export const updateList = (_id, title, body) => {


     return {
         type: 'updateList',
         payload: {
             '_id': _id,
             'title': title,
             'body': body,
         }

     }
 }

 export const deleteList = (_id) => {

     return {
         type: "deleteList",
         payload: {
             '_id': _id
         }
     }

 }

 export const addNote_state = (data) => {

     return {
         type: "insertdata",
         payload: data
     }
 }


 //


 export const resetUser = () => {
     return {

         type: 'reset',

     }

 }

 export const setUserDetails = (data) => {
     return {
         type: 'setUserDetails',
         payload: data
     }
 }

 export const setTitle_Body = (title, body) => {
     return {
         type: 'setTitle_Body',
         payload: { title, body }
     }
 }