import prisma from "@/db/prisma";

export const POST = async (req: any) => {
    try {
        console.log("POST upload api");
        const formData = await req.formData();
        const id = formData.get("id");
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        const birthday = formData.get("birthday");
        const idFile = formData.get("idFile");
        const financeFile = formData.get("financeFile");
        const selfieFile = formData.get("selfieFile");

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                firstname: firstname,
                lastname: lastname,
                birthday: birthday,
                idVerificationFileLink: idFile,
                financeVerificationFileLink: financeFile,
                selfieLink: selfieFile,
                isVerifySubmitted: true
            }
        });

        return new Response(JSON.stringify(updatedUser), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return new Response(JSON.stringify({ error: "Failed to verify user" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
