interface Images {
    altText: string,
    _key: string,
    _type: string,
    assets: {
        _ref: string,
        _type: string
    }
}
export interface BacImages {
    title: string,
    images: Images[],
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string
}

interface Menus {
    menuName: string,
    menuUrl: string,
    _key: string
}
export interface Menu {
    title: string,
    menu: Menus[],
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string
}

interface skillCards {
    position: string,
    text:string,
    textSize: number,
    _key: string,
    digitalContent: {
        _type: string,
        asset: {
            _ref: string,
            _type: string
        }
    },
    textColor: unknown
}

export interface SkillCard {
    title: string,
    skillCard: skillCards[],
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string
}

export type regFormData = {
    userName:string;
    email: string;
    password: string;
    mobileNumber:string;
    referralSource?:string;
    companyName:string;
    teamSize:string;

}

export type loginFormData = {
    email: string;
    password: string;
}