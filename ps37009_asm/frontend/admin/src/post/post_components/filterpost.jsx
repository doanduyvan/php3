import React from 'react';
import {chageStatus} from '../post_reducer/action';

function FilterPost({ status, onChangeStatus }) {
    const classActive = 'bg-blue-300';
    const statuses = [
      { id: 0, label: 'Bài viết chờ duyệt' },
      { id: 1, label: 'Bài viết đã duyệt' },
      { id: 2, label: 'Bài viết từ chối' },
      { id: 3, label: 'Bài viết bị hủy' },
    ];
  
    return (
      <div className="flex gap-2 mb-5">
        {statuses.map((s) => (
          <button
            key={s.id}
            className={`p-3 border hover:bg-blue-400 ${status === s.id ? classActive : ''}`}
            onClick={() => onChangeStatus(chageStatus(s.id))}
          >
            {s.label}
          </button>
        ))}
      </div>
    );
  }

  export default FilterPost;