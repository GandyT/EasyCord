class EasyEmbed {
    // am i doing this correctly?
    constructor(title, desc, fields, img, thumb, footer) {
        
    }

    getEmbed() {
        return this;
    }

    setTitle(string)
    {
        if (typeof string != 'string') string = string.toString();
        this.title = string;
        return this;
    }
    setDescription(string)
    {
        if (typeof string != 'string') string = string.toString();
        this.description = string;
        return this;
    }
    setDesc(string)
    {
        if (typeof string != 'string') this.description = string.toString();
        this.description = string;
        return this;
    }
    addFields(fieldObjArray, value)
    {
        switch(typeof fieldObjArray)
        {
            case 'object':
                let objsToCheck = [];
                if (fieldObjArray[0]) objsToCheck = fieldObjArray;
                else objsToCheck = [fieldObjArray];
                this._validateFields(objsToCheck);
                objsToCheck.forEach(obj => obj.inline ? obj.inline = obj.inline : obj.inline = false);
            case 'string':
                if (!value) return;
                break;
        }
        return this;
    }
    _validateFields(arr)
    {
        // ?array => object: must have valid string name and value
        arr.forEach(obj =>
        {
            if (typeof obj != 'object') return;
            if (!obj.name || !obj.value) return;
            Object.keys()
        })
    }
}

module.exports = EasyEmbed;