import React from 'react';

import './styles.css';


function DevItem({ dev, onClickEdit, onClickRemove }) {

    async function handleButtonEdit(github_username) {
        await onClickEdit(github_username);
    };

    async function handleRemoveDev(github_username) {
        await onClickRemove(github_username)
    };

    return (
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                    <strong>
                        {dev.name}
                        <a href={`https://github.com/${dev.github_username}`} className="button-icon"><i className="fa fa-github"></i></a>
                        <button className="button-icon" onClick={() => handleButtonEdit(dev.github_username)}><i className="fa fa-edit"></i></button>
                        <button className="button-icon" onClick={() => handleRemoveDev(dev.github_username)}><i className="fa fa-trash"></i></button>
                    </strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>

            <div>
                <p>{dev.bio}</p>
            </div>
        </li>
    );
};

export default DevItem;