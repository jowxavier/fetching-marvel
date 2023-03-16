import axios from "axios";
import { useEffect, useState } from "react"

export function useRequest<T = unknown>(url: string) {
    const [data, setData] = useState<T | null>(null)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        axios.get(url)
        .then(response => {
            setData(response.data.data.results);
        })
        .finally(() => {
            setIsFetching(false);
        })
      }, [])

      return { data, isFetching }
}