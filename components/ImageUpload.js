import { useState } from "react"
import { API_URL } from "@/config/index"
import styles from '@/styles/Form.module.css'

export default function ImageUpload({evtId, onImageUploaded}) {

    const [image, setImage] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const fromData = new FormData();
        fromData.append('files', image);
        fromData.append('ref', 'events');
        fromData.append('refId', evtId);
        fromData.append('field', 'image');

        const res = await fetch(`${API_URL}/upload`,{
            method:'POST',
            body: fromData
        })
        
        if(res.ok){
            onImageUploaded?.();
        }
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <input type="submit" value="upload" className='btn'/>
            </form>
        </div>
    )
}
