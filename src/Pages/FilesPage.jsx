import MiniStateContainer from '../Components/MiniStateContainer'
import Menubar from '../Components/Menubar'
import "../Style/Files.css"
import Cards from '../Components/Cards'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { createNewFile, deleteFile, getSaveFileList, saveCurrentState } from '../Script/FilesDataFetchers'
import { match } from '../Components/SearchBar'
import "../Script/commonJS"
import OwnerFooter from '../Components/OwnerFooter'

function FilesPage() {
    return (
        <>
            <Menubar activeMenuIndex={5} />
            <div className='main-container files'>
                <MainComponents />
                <OwnerFooter />
            </div>
        </>
    )
}

function MainComponents() {
    const [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState("")

    const fileDeleteBtn = useRef()
    const fileCreateBtn = useRef()

    useEffect(() => {
        startUp();
    }, [])

    const startUp = useCallback(() => {
        getSaveFileList(setFiles);
        setFileName("");
    }, [])

    const fileCardClickHandler = useCallback((event) => {
        setFileName(event.target.title)
        fileDeleteBtn.current.style.cssText = "display: block;";
        fileCreateBtn.current.style.cssText = "display: none;";
    }, [])
    const addFileBtnClickHandler = useCallback(() => {
        fileDeleteBtn.current.style.cssText = "display: none;";
        fileCreateBtn.current.style.cssText = "display: block;";
        setFileName("")
    }, [])
    return (
        <div className='top-sub-container'>
            <div className='left-sub-container'>
                <MiniStateContainer />
                <Cards
                    cardDetails={files}
                    cardClickHandler={fileCardClickHandler}
                    addBtnClickHandler={addFileBtnClickHandler} />
            </div>
            <div className='right-sub-container'>
                <DetailsContainer
                    fileName={fileName}
                    setFileName={setFileName}
                    files={files}
                    startUp={startUp}
                    fileCreateBtnRef={fileCreateBtn}
                    fileDeleteBtnRef={fileDeleteBtn}
                />
            </div>
        </div>
    )
}

function DetailsContainer({ fileName, setFileName, files, startUp, fileCreateBtnRef, fileDeleteBtnRef }) {
    const inputOnChangeHandler = useCallback((event) => {
        setFileName(event.target.value)
    }, [])
    const fileFormOnSubmitHandler = useCallback((event) => {
        event.preventDefault();
        if (fileName.trim() === "") {
            alert("File Name can't be Empty");
            return;
        }
        if (match(files, fileName).length > 0) {
            saveCurrentState(fileName, startUp);
        } else {
            if (window.confirm("Are you want to save the current state into " + fileName + "?"))
                saveCurrentState(fileName, startUp);
        }
    }, [fileName, files])
    const createNewBtnClickHandler = useCallback((event) => {
        event.preventDefault();
        if (fileName.trim() === "") {
            alert("File Name can't be Empty");
            return;
        }
        if (match(files, fileName).length > 0) {
            alert("File already exist with same name")
            return
        } else {
            createNewFile(fileName, startUp);
        }
    }, [fileName, files])
    const deleteFileBtnClickHandler = useCallback((event) => {
        event.preventDefault();
        if (window.confirm("Are You Sure? Want to delete " + fileName + "?")) {
            deleteFile(fileName, () => {
                startUp();
            })
        }
    }, [fileName])
    return (
        <form className='details-container' onSubmit={fileFormOnSubmitHandler}>
            <div className='inputs-container-heading'>Details</div>
            <div className="input-container">
                <div className="input-box-heading">File Name</div>
                <input
                    type="text"
                    className="input-box"
                    name='fileName'
                    value={fileName}
                    placeholder='Ex. ABC'
                    onChange={event => {
                        inputOnChangeHandler(event)
                    }}></input>
            </div>
            <div className='save-btn-container'>
                <button className='file-save-btn' type='submit'>Copy Current State</button>
                <button className='file-delete-btn' onClick={deleteFileBtnClickHandler} ref={fileDeleteBtnRef}>Delete</button>
                <button className='file-create-btn' onClick={createNewBtnClickHandler} ref={fileCreateBtnRef}>Create New</button>
            </div>
        </form>
    )
}

export default memo(FilesPage)