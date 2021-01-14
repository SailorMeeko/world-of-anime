import database from '../config/firebase';
import React, {Fragment, useState, useEffect} from 'react';
import ShoutMessage from './ShoutMessage';
import moment from 'moment';

const Shout = () => {
    const [shouts, setShouts] = useState('');

    useEffect(() => {
        let currentShouts;

        async function getShouts() {

            currentShouts = database.ref(`shouts`).orderByChild(`create_date`).limitToLast(10);
            currentShouts.on('value', function(snapshot) {
                if (!snapshot.val()) {
                    setShouts('');
                } else {
                    currentShouts = [];

                    snapshot.forEach((childSnapshot) => {
                        currentShouts.push({
                            id: currentShouts.key,
                            ...childSnapshot.val()
                        });
                    });
                    setShouts(currentShouts);
                }
            });

        }

        getShouts();

        return function cleanup() {
            if (currentShouts != null) {
                currentShouts.off();
            }
        }
    }, []);

   async function postShout(name, shout) {
        return database.ref(`shouts`).push({
            name,
            shout,
            create_date: Date.now()
        });
   } 


    const [formData, setFormData] = useState({
        shoutName: '',
        shoutText: ''
    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const { shoutName, shoutText } = formData;    

    const onSubmitNewShout = async e => {
        e.preventDefault();
        postShout(formData.shoutName, formData.shoutText);

        setFormData({shoutName:'', shoutText:''});
    };

    console.log(shouts);

    return (
        <Fragment>
        <div className="profile-action-box">
        <form>
            Name: <input
                name="shoutName"
                value={shoutName}
                onChange={e => onChange(e)}
                />
            <textarea
                name="shoutText"
                rows="4"
                value={shoutText}
                onChange={e => onChange(e)}
            />

            <p><button className="post-container comment-button" onClick={e => onSubmitNewShout(e)}>Shout!</button></p>
        </form>

        {shouts && shouts.length > 0 && 
            <Fragment>
            {shouts.sort(
                (a, b) =>
                moment(b.create_date) - moment(a.create_date)
               ).map(comment => (
                <ShoutMessage key={comment.id} comment={comment} />
            ))}
        </Fragment>}     
    </div>
        </Fragment>
    )
};

export default Shout;