import React from 'react';
import Heading from './Heading';
import { USER_ROLE } from '../../ScreenJson';
import { useSelector } from 'react-redux';

const Title = ({ component }) => {
    const userProfile = useSelector((state) => state.profile);
    let idx = component.common
        ? 0
        : userProfile.role === USER_ROLE.bfAdmin
            ? 0
            : userProfile.role === USER_ROLE.channelPartner
                ? 1
                : 2;
    return (
        <Heading
            component={{
                text: component?.titles[idx],
                className: "formheadingcontainer",
            }}
        />
    );
}

export default Title;