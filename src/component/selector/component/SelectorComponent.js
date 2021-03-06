import React from "react";
import CreatableSelect from 'react-select/lib/Creatable'

class SelectorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            selectedOption: null
        };

        // this.tagsOptions = [
        //     {value: 'c', label: 'C'},
        //     {value: 'c++', label: 'C++'},
        //     {value: 'c#', label: 'C#'},
        //     {value: 'java', label: 'Java'},
        //     {value: 'javascript', label: 'JavaScript'},
        //     {value: 'ruby', label: 'Ruby'},
        //     {value: 'python', label: 'Python'}
        // ];

        this.tagsOptions = this.props.tags;
        this.statusOptions = [
            {value: 'todo', label: 'To do'},
            {value: 'in progress', label: 'In progress'},
            {value: 'blocked', label: 'Blocked'},
        ];
    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
        if (this.props.isStatus) {
            this.props.item.status = selectedOption.label;
        } else {
            this.props.item.tags = selectedOption.map(value => value.label);
            this.props.advSearch.tags = selectedOption.map(value => value.label);
            console.log(this.props.item.tags);
        }
    };

    render() {
        const {selectedOption} = this.state;
        let statusPlaceholder = 'Select...', tagPlaceholder = 'Select...';
        if (this.props.item !== undefined && this.props.item.tags.length !== 0) {
            tagPlaceholder = this.props.item.tags.join(', ');
            statusPlaceholder = this.props.item.status;
        }
        return (
            <div>
                {
                    !this.props.isStatus && <CreatableSelect
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={this.tagsOptions}
                        isMulti={true}
                        placeholder={tagPlaceholder}
                    />
                }
                {
                    this.props.isStatus === true && <CreatableSelect
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={this.statusOptions}
                        placeholder={statusPlaceholder}
                    />
                }
            </div>
        )
    }
}

export default SelectorComponent;

