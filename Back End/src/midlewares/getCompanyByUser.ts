import db from "../database/db";

export default async function getCompanyByUser(permission : string) {
    try {
        const company = await db.access.findFirst({
            where:{
                id: permission
            },
            select: {
                company_id: true
            }
        })
        return company?.company_id;
    }
    catch (error) {
        return null;
    }
}