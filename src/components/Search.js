import React, { useState } from 'react'
import _ from 'lodash'
import { useMutation, gql } from '@apollo/client'

const searchForUserQuery = gql`
    query ($search:String!) {
        searchForUser(search:$search) {
            success,
            user
        }
    }
`

function Search () {

}