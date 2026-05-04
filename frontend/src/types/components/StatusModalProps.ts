export default interface StatusModalProps {
    isOpen: boolean
    onClose: () => void
    type: 'success' | 'error'
    message: string
}