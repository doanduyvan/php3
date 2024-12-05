import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostDetail from './post_components/postdetail';
import LoaDing from '../components/loading';
import api from '../api';
import { UserContext } from '../context/usercontext';
import AcceptPostAction from './post_components/acceptpostaction';
import { notification } from 'antd';
import { timeAgo } from '../components/helper';
function ViewPost() {
    const { user } = useContext(UserContext);
    const [loader, setLoader] = useState(false);
    const [post, setPost] = useState(null);
    const [logs, setLog] = useState([]);

    const [showform, setShowForm] = useState(true);
    const [note, setNote] = useState('');
    const [status, setStatus] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!id || isNaN(id)) {
            navigate('/404');
        }
    }, [id, navigate]);

    useEffect(() => {
        setLoader(true);
        api.get(`/admin/news/${id}`)
            .then(res => {
                const data = res.data;
                setPost(data);
                const logs = data.reviewlogs.map((log) => {
                    return {
                        fullname: log.admin.fullname,
                        note: log.note,
                        status: log.status === 1 ? "Đã Duyệt" : "Từ Chối",
                        created_at: log.created_at
                    };
                });
                setLog(logs);
                console.log(data);
            })
            .catch(err => {
                console.log("dv error: ", err);
            })
            .finally(() => {
                setLoader(false);
            });
    }, []);

    const handleSubmit = () => {

        if (status === null) {
            notification.error({
                message: 'Chưa chọn trạng thái'
            });
            return;
        }

        const dataReQuest = {
            id: id,
            status: status,
            note: note
        };
        setLoader(true);
        api.post('/admin/news/updatestatusforcensor', dataReQuest)
            .then(res => {
                notification.success({
                    message: 'Cập nhật trạng thái thành công'
                });
                setShowForm(false);
                const data = res.data.reviewlog;
                const newReviewLog = {
                    fullname: user.username,
                    note: data.note,
                    status: data.onoff === 1 ? "Đã Duyệt" : "Từ Chối",
                    created_at: data.created_at
                };
                setLog([...logs, newReviewLog]);
                console.log(data);
            })
            .catch(err => {
                const status = err.response.status;
                const error = err.response.data.error;
                if (status && status === 401) {
                    notification.error({
                        message: 'Cập nhật trạng thái không thành công',
                        description: error || 'Vui lòng thử lại sau',
                    });
                    return;
                }
                notification.error({
                    message: 'Cập nhật trạng thái không thành công',
                    description: error || 'Vui lòng thử lại sau',
                });
                console.log(err);
            })
            .finally(() => {
                setLoader(false);
            });
    };



    return (
        <>
            {/* <PostDetail id={id} /> */}
            {post && <PostDetail chitiet={post} />}

            {post && post.onoff == 0 && showform && user.role == 2 &&
                <AcceptPostAction onAcceptPost={setStatus} onNoteChange={setNote} onSubmit={handleSubmit} />
            }
            {/* review */}
            <div className='p-5 mb-5'>
                <h3 className='text-2xl'>Review</h3>
                <table className="w-full max-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Người Duyệt
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ghi Chú
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng Thái
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày Duyệt
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={'lob_' + index}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {log.fullname}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {log.note}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {log.status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {timeAgo(log.created_at)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <LoaDing loader={loader} />
        </>
    )
}

export default ViewPost;