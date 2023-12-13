import { createContext, useState, ReactNode } from "react"

export type UploadInfo = {
    uploaded : boolean,
    setUplopaded : (uploaded:boolean) => void,
}

type UploadInfoProviderProps = {
    children : ReactNode
}

export const CounselContext = createContext<UploadInfo | undefined>(undefined)

export const CounselContextProvider : React.FC<UploadInfoProviderProps> = ({children}) => {

    const [uploaded, setUplopaded] = useState(false)

    const uploadInfo : UploadInfo = {
        uploaded, setUplopaded
    } 

    return (
        <CounselContext.Provider value={uploadInfo}>
            {children}
        </CounselContext.Provider>
    );
}