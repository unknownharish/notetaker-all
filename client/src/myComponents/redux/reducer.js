let initialState = {
    allNotes: [],
    edittitle: '',
    editbody: '',
    _id: '',
    email: '',
    googleUser: '',
    image: '',
    name: '',
    title: '',
    body: '',
    note_id: '',
    totalDocuments: 0


}


export const editUser = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_ALL_NOTES':
            {
                console.log('in editNotes redux');

                return {
                    // ...state.allNotes.length === 0 ? {...state, allNotes: action.payload, totalDocuments: action.totalDocuments } : ''
                    ...state,
                    allNotes: action.payload.notes,
                    totalDocuments: action.payload.totalDocuments
                }

            }

        case 'Edit_title_body':
            {
                return {
                    ...state,
                    edititle: action.payload.title,
                    editbody: action.payload.body
                }

            }

        case 'SET_PAGE':
            {
                return {...state,
                    page: action.payload

                }
            }
        case 'skip_data':
            {

                return {

                    ...state,
                    allNotes: action.payload,
                    totalDocuments: action.totalDocuments
                }
            }

        case "SET_TB":
            {
                return {
                    ...state,
                    edittitle: action.payload.title,
                    editbody: action.payload.body,
                    note_id: action.payload._id
                }
            }

        case "updateList":
            {
                state.allNotes.map(x => {
                    if (x._id === action.payload._id) {

                        x.title = action.payload.title;
                        x.body = action.payload.body
                    }
                })
                return {
                    ...state
                }

            }

        case 'deleteList':
            {
                let newList = state.allNotes.filter(x => x !== action.payload._id);

                return {
                    ...state,
                    allNotes: newList

                }


            }

        case "insertdata":
            {
                // console.log(action.pay)
                return {
                    ...state,
                    allNotes: [...state.allNotes.splice(1, 1), {...action.payload }]
                }
            }

            // my work ..!



        case 'reset':
            {

                return {

                    ...state,
                    _id: '',
                    allNotes: [],
                    edittitle: '',
                    editbody: '',
                    email: '',
                    googleUser: '',
                    image: '',
                    name: '',
                    title: '',
                    body: '',
                    note_id: '',
                    totalDocuments: 0

                }
            }

        case 'setUserDetails':
            {
                return {
                    ...state,
                    email: action.payload.email,
                    googleUser: action.payload.googleUser,
                    image: action.payload.image,
                    name: action.payload.name,
                    _id: action.payload._id

                }

            }



        case 'setTitle_Body':


            let title = action.payload.title;
            let body = action.payload.body;
            let _id = state._id

            {
                return {

                    ...state,
                    title: title,
                    body: body,
                    allNotes: [...state.allNotes, { _id, title, body }] // append to notes


                }

            }











        default:
            {
                return state;
            }

    }

}