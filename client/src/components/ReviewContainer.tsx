import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Button, TextField } from '@mui/material'
import { ReviewCard } from './cards/ReviewCard'
import { Review } from '../interfaces/models'
import { reviewApi } from '../api'
import { Context } from '../store'
import { incorrectHandler } from '../shared/constants'

export const ReviewContainer = observer(() => {
  const { room, user, review } = useContext(Context)

  const [isEdit, setIsEdit] = useState(false)
  const [current, setCurrent] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    reviewApi
      .getAll(room.current._id)
      .then((response) => review.setReviews(response))
      .catch((e) => console.error(e))
  }, [])

  const submitChangeHandler = () => {
    if (user.isAuth && content) {
      reviewApi
        .change(current, content)
        .then((response) => {
          review.changeReview(response)
          setContent('')
          setCurrent('')
          setIsEdit(false)
        })
        .catch((e) => console.error(e))
    } else {
      incorrectHandler()
    }
  }

  const submitCreateHandler = () => {
    if (user.isAuth && content) {
      reviewApi
        .create(room.current._id, user.user.email, content)
        .then((response) => {
          review.addReview(response)
          setContent('')
        })
        .catch((e) => console.error(e))
    } else {
      incorrectHandler()
    }
  }

  const changeHandler = (currentReview: Review) => {
    setIsEdit(true)
    setCurrent(currentReview._id)
    setContent(currentReview.content)
  }

  const deleteHandler = (id: string) => {
    reviewApi
      .delete(id)
      .then((response) => review.deleteReview(response))
      .catch((e) => console.error(e))
  }

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {review.reviews.map((r) => (
          <ReviewCard
            key={r._id}
            review={r}
            isOwner={user.isAuth && r.author === user.user.email}
            onChange={changeHandler}
            onDelete={deleteHandler}
          />
        ))}
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          py: 1,
          width: '100%',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <TextField
          label="Review content"
          value={content}
          type="text"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ m: '0 auto', height: '80%' }}
          onClick={isEdit ? submitChangeHandler : submitCreateHandler}
          disabled={!user.isAuth}
        >
          {isEdit ? 'Edit review' : 'Add review'}
        </Button>
      </Box>
    </>
  )
})
