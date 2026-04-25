import { useState } from 'react'

const useChannelModals = (cleaners = {}) => {
    const [modals, setModals] = useState({
        addChannel: false,
        inviteUser: false,
        editWorkspace: false,
        deleteWorkspace: false
    })
    const [errorMessage, setErrorMessage] = useState('')

    const openModal = (type) => {
        setModals(prev => ({ ...prev, [type]: true }))
    }

    const closeModal = (type) => {
        setModals(prev => ({ ...prev, [type]: false }))
        setErrorMessage('')
        if (cleaners[type]) {
            cleaners[type]()
        }
    }

    return {
        modals,
        errorMessage,
        setErrorMessage,
        openModal,
        closeModal
    }
}

export default useChannelModals
