export const setToast = (toast, title, status, description) => toast({
    title,
    description,
    status,
    duration: 5000,
    isClosable: true,
});