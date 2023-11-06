import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const authApi  = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/users',
        prepareHeaders: ({

        }),
        endpoints
    })
})


