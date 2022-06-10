import axios from 'axios'

import { getnotes, updateList, deleteList, addNote_state } from '../redux/action'


export const getAllNotes = (_id) => (async(dispatch) => {

    // console.log('in inner function')
    try {


        let { data } = await axios.get(`/api/get/${_id}`);

        // console.log(data);

        dispatch(getnotes(data));
    } catch (error) {
        console.log(error);

    }
})


export const delAsync = (_id) => async(dispatch) => {



    let { data } = await axios.delete(`/api/delete/${_id}`);
    console.log(_id);
    console.log(data);

    // dispatch(deleteList(_id))


}


export const insertAsync = (_id, title, body) => async(dispatch) => {
    try {

        let { data } = await axios.post(`/api/insert/${_id}`, {

                "title": title,
                "body": body

            })
            // console.log(data)
            // if (data.error) {

        //     dispatch(addNote_state(data.data.notes))
        // }

    } catch (error) {
        console.log(error);

    }
}

export const updateAsync = (_id, title, body) => async(dispatch) => {

    try {


        let { data } = await axios.put(`/api/update/${_id}`, {

                "title": title,
                "body": body,
            })
            // dispatch(updateList(_id, title, body));

        // data.error ? console.log('in update async actions', data) : ''

    } catch (error) {

        console.log(error);
    }


}


export const skipNotes = (_id, pageno) => async(dispatch) => {

    let { data } = await axios.get(`/api/skip/${_id}/${pageno}`);
    console.log(data)

    dispatch({
        type: "skip_data",
        payload: data.data,
        totalDocuments: data.totalDocument
    })




}