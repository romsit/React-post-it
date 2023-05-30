'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function AddComment({}) {
    return(
        <form className='my-8'>
            <h3>Add a comment</h3>            
        </form>
    )
}