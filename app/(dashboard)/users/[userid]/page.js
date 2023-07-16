import React from 'react'
import _ from 'lodash'
import ProfileCard from '@/app/components/profileCard'
import User from '@/app/database/model/usermodel'
import connectDB from '@/app/database/connection';

async function getData(id) {
    await connectDB();
    const fetchUser = await User.findOne({ _id: id })
    return fetchUser;
}

const page = async ({ params }) => {
    const fetchUserData = await getData(params.userid)
    const { fname, lname, image, batchFullName, email } = fetchUserData

    return (
        <div className='min-h-screen rounded'>
            <ProfileCard fname={fname} lname={lname} image={image} batchFullName={batchFullName} email={email} />
        </div>
    )
}

export default page
