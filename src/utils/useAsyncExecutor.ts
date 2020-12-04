import { useState } from "react"

type ProcessType<T> = {
    onExecute: () => Promise<T>
    onComplete?: (value: T) => void
}

export type UserAsyncExecutorType<T> = {
    loading: boolean
    error: any
    asyncExecutor: (process: ProcessType<T>) => void
}

export function useAsyncExecutor<T>(): UserAsyncExecutorType<T> {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>()

    const asyncExecutor = <T>(process: ProcessType<T>) => {
        setError(null)
        setLoading(true)

        process.onExecute()
            .then((value: T) => {
                if (process.onComplete) process.onComplete(value)
                setLoading(false)
            })
            .catch((error: any) => {
                setError(error)
                setLoading(false)
            })
    }
    return { loading, error, asyncExecutor }
}