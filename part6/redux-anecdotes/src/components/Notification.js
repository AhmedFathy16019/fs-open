import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ filter, anecdotes, message }) => message)
  console.log('message :>> ', notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return null
  }
}

export default Notification