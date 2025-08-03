import { ElNotification } from "element-plus";

export function useNotify() {
    const success = (message: string, title = 'Успешно') => {
        ElNotification({
            title,
            message,
            type: 'success',
            duration: 2000
        })
    }

    const error = (message: string, title = 'Ошибка') => {
        ElNotification({
            title,
            message,
            type: 'error',
            duration: 2000
        })
    }

    return {
        success,
        error
    }
}