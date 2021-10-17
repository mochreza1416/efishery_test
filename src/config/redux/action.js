import axios from 'axios';  

const producType = {
    FETCH_HARGAPERIKANAN_REQUEST : 'FETCH_HARGAPERIKANAN_REQUEST',
    FETCH_HARGAPERIKANAN_SUCCESS : 'FETCH_HARGAPERIKANAN_SUCCESS',
    FETCH_HARGAPERIKANAN_FAIL : 'FETCH_HARGAPERIKANAN_FAIL',

    POST_HARGAPERIKANAN_REQUEST : 'POST_HARGAPERIKANAN_REQUEST',
    POST_HARGAPERIKANAN_SUCCESS : 'POST_HARGAPERIKANAN_SUCCESS',
    POST_HARGAPERIKANAN_FAIL : 'POST_HARGAPERIKANAN_FAIL',

    PUT_HARGAPERIKANAN_REQUEST : 'PUT_HARGAPERIKANAN_REQUEST',
    PUT_HARGAPERIKANAN_SUCCESS : 'PUT_HARGAPERIKANAN_SUCCESS',
    PUT_HARGAPERIKANAN_FAIL : 'PUT_HARGAPERIKANAN_FAIL',

    DELETE_HARGAPERIKANAN_REQUEST : 'DELETE_HARGAPERIKANAN_REQUEST',
    DELETE_HARGAPERIKANAN_SUCCESS : 'DELETE_HARGAPERIKANAN_SUCCESS',
    DELETE_HARGAPERIKANAN_FAIL : 'DELETE_HARGAPERIKANAN_FAIL',
}

const productAction = {  
    fetchHargaPerikananRequest: (props) => ({
        type: producType.FETCH_HARGAPERIKANAN_REQUEST,
        payload: props
    }),

    fetchHargaPerikananSuccess: (props) => ({
        type: producType.FETCH_HARGAPERIKANAN_SUCCESS,
        payload: props
    }),

    fetchHargaPerikananFail: (props) => ({
        type: producType.FETCH_HARGAPERIKANAN_FAIL,
        payload: props
    }),

    postHargaPerikananRequest: (props) => ({
        type: producType.POST_HARGAPERIKANAN_REQUEST,
        payload: props
    }),

    postHargaPerikananSuccess: (props) => ({
        type: producType.POST_HARGAPERIKANAN_SUCCESS,
        payload: props
    }),

    postHargaPerikananFail: (props) => ({
        type: producType.POST_HARGAPERIKANAN_FAIL,
        payload: props
    }),

    putHargaPerikananRequest: (props) => ({
        type: producType.PUT_HARGAPERIKANAN_REQUEST,
        payload: props
    }),

    putHargaPerikananSuccess: (props) => ({
        type: producType.PUT_HARGAPERIKANAN_SUCCESS,
        payload: props
    }),

    putHargaPerikananFail: (props) => ({
        type: producType.PUT_HARGAPERIKANAN_FAIL,
        payload: props
    }),

    deleteHargaPerikananRequest: (props) => ({
        type: producType.DELETE_HARGAPERIKANAN_REQUEST,
        payload: props
    }),

    deleteHargaPerikananSuccess: (props) => ({
        type: producType.DELETE_HARGAPERIKANAN_SUCCESS,
        payload: props
    }),

    deleteHargaPerikananFail: (props) => ({
        type: producType.DELETE_HARGAPERIKANAN_FAIL,
        payload: props
    }),
}

const apiHargaPerikananFetch = () => {
    return (dispatch)=>{
        dispatch(productAction.fetchHargaPerikananRequest());
        axios({
            url: "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list",
            method: "GET"
        }).then(response =>{
            // console.log("test",response)
            dispatch(productAction.fetchHargaPerikananSuccess(response.data))
        }).catch(err =>{
            dispatch(productAction.fetchHargaPerikananFail(err))
        })
    }
}

const apiHargaPerikananPost = () => {
    return (dispatch)=>{
        dispatch(productAction.postHargaPerikananRequest());
        axios({
            url: "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list",
            method: "POST"
        }).then(response =>{
            // console.log("test",response)
            dispatch(productAction.postHargaPerikananSuccess(response.data))
        }).catch(err =>{
            dispatch(productAction.postHargaPerikananFail(err))
        })
    }
}

const apiHargaPerikananPut = () => {
    return (dispatch)=>{
        dispatch(productAction.putHargaPerikananRequest());
        axios({
            url: "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list",
            method: "PUT"
        }).then(response =>{
            // console.log("test",response)
            dispatch(productAction.putHargaPerikananSuccess(response.data))
        }).catch(err =>{
            dispatch(productAction.putHargaPerikananFail(err))
        })
    }
}

const apiHargaPerikananDelete = () => {
    return (dispatch)=>{
        dispatch(productAction.deleteHargaPerikananRequest());
        axios({
            url: "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list",
            method: "DELETE"
        }).then(response =>{
            // console.log("test",response)
            dispatch(productAction.deleteHargaPerikananSuccess(response.data))
        }).catch(err =>{
            dispatch(productAction.deleteHargaPerikananFail(err))
        })
    }
}

 const products = { producType,productAction,apiHargaPerikananFetch,apiHargaPerikananPost,apiHargaPerikananPut,apiHargaPerikananDelete };

 export default products;


