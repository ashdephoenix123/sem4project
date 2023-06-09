import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import _ from 'lodash'

async function getData(subjectcode, chapternumber) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/courses`, { cache: 'no-store' })
    const data = await res.json()

    const chaptersByNumber = {}

    data.courses.forEach((course) => {
        course.semesters.forEach((semester) => {
            semester.subjects.forEach((subject) => {
                if (subject.subjectcode === subjectcode) {
                    subject.chapters.forEach((chapter) => {
                        chaptersByNumber[chapter.chapternumber] = chapter
                    })
                }
            })
        })
    })


    const currentChapter = chaptersByNumber[Number(chapternumber)]

    if (!currentChapter) {
        throw new Error('Chapter not found')
    }

    return currentChapter
}

const Page = async ({ params }) => {

    const currentChapter = await getData(params.subjectcode, params.chapternumber)

    return (
        <>
            <section className='min-h-screen'>
                <h3 className='heading1 mb-4'>{currentChapter.chaptername}</h3>
                <Link href={currentChapter.linktopdf} target='_blank' className='relative w-16 h-16 hover:cursor-pointer block mb-6'>
                    <Image src='/pdfImage.png' fill alt='pdfImage'></Image>
                    <MdDownloadForOffline className='absolute text-green-500 right-1 bottom-0 inline-block w-4 h-4 rounded-full bg-white max-[577px]:right-0' />
                </Link>
                <div className='mb-4'>
                    <h3 className='heading2 italic inline-block bg-yellow-400 p-1 mb-2'>Topics Covered:</h3>
                    <ul>
                        {
                            currentChapter.topics?.map((item, index) => (
                                <li key={index} className='heading3 text-sm'>&bull; &nbsp;{_.capitalize(item)}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className='mb-4'>
                    <h3>Recorded Sessions:</h3>
                    <div>
                        {
                            currentChapter.recordedsessions?.map((item, index) => (
                                <div key={index} className='mb-2'>
                                    &bull;&nbsp;<Link className='underline text-sm italic' target='_blank' href={item}>{`Session ${index + 1}`}</Link>
                                    <div className=''>
                                        <video height={380} width={520} controls>
                                            <source src={item} type="video/mp4" /> // make sure the video uploaded is in mp4 format or you can change the type accordingly
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page
