import React, { useEffect, useState } from 'react'
import './body.css'
import axios from 'axios';
import Loader from '../Loader/Loader';

export default function Body() {
    const listName = window.location.pathname.split('/')[1];
    const url = 'https://todolist-server-eha5.onrender.com/';

    const [listData, setListData] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (listName) {
            axios.get(url + `${listName}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(res => {
                const { data } = res;
                setListData(data.data.items);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [listName, listData]);

    const addItems = (e) => {
        e.preventDefault();
        setIsAdding(true);
        const itemName = prompt('Enter item name');
        if (itemName) {
            axios.post(url, {
                newItem: itemName,
                list: listName
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(res => {
                alert('Item added successfully');
            }).catch(err => {
                alert('Item addition failed');
            });
            setIsAdding(false);
        }
    };

    const deleteItem = (e, id) => {
        e.preventDefault();
        setIsDeleting(true);
        axios.delete(url, {
            data: {
                listName: listName,
                checkedItemId: id
            },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(res => {
            alert('Item deleted successfully');
        }).catch(err => {
            alert('Item deletion failed');
        });
        setIsDeleting(false);
    };

    const taskDone = (e) => {
        e.target.parentElement.classList.toggle('done');
    };

    return (
        <div className='body'>
            <div className='body-heading'>
                <h1>{listName.replace(listName.charAt(0), listName.charAt(0).toUpperCase())}</h1>
            </div>
            <div className='body-data'>
                {listData && listData.map(i => {
                    return (
                        <div className='item' key={i._id}>
                            <input disabled={isDeleting || isAdding ? true : false} onClick={(e) => taskDone(e)} type='checkbox' className='item-checkbox' />
                            <div className='item-info'>
                                <p>{i.name}</p>
                            </div>
                            <button disabled={isDeleting || isAdding ? true : false} onClick={(e) => deleteItem(e, i._id)} className='item-delete'><i className='fa fa-trash'></i></button>
                        </div>
                    )
                })}
                {listName && listData.length === 0 ? (
                    <Loader props={listName} />
                ) : null}
            </div>
            {listName ? (
                <div className='body-add'>
                    <button onClick={(e) => addItems(e)} className='add-item'><i className='fa fa-plus'></i></button>
                </div>
            ) : (
                <div className='empty-list'>
                    <p>Open or Create a List.</p>
                </div>
            )}
        </div>
    )
}
