import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/slices/productsSlice'

const useInfiniteScroll = () => {
  const dispatch = useDispatch()
  const { loading, hasMore, page, searchTerm } = useSelector(state => state.products)

  const loadMore = useCallback(() => {
    if (!loading && hasMore && !searchTerm) {
      dispatch(fetchProducts({ page: page + 1, limit: 10 }))
    }
  }, [dispatch, loading, hasMore, page, searchTerm])

  useEffect(() => {
    const handleScroll = () => {
      if (
        !searchTerm &&
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMore, searchTerm])

  return { loadMore }
}

export default useInfiniteScroll
