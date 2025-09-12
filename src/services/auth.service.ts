import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { IGlobalResponse } from "../interfaces/global.interface";
import { IAdminResponse, ILoginResponse } from "../interfaces/auth.interface";
import { UGenerateToken } from "../utils/token.util";

const prisma = new PrismaClient();

//* LOGIN
export const SLogin = async (
    usernameOrEmail: string,
    password: string
): Promise<IGlobalResponse<ILoginResponse>> => {
    const admin = await prisma.admin.findFirst({
        where: {
            OR: [
                { username: usernameOrEmail },
                { email: usernameOrEmail },
            ],
            isActive: true,
            deletedAt: null,
        },
    });

    if (!admin) {
        throw Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
        throw Error("Invalid credentials");
    }

    const token = UGenerateToken({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
    });

    return ({
        status: true,
        message: "Login successful",
        data: {
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                name: admin.name,
            },
        },
    })
}

//* CREATE
export const SCreateAdmin = async (
  data: { username: string; password: string; email: string; name: string }
): Promise<IGlobalResponse<any>> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newAdmin = await prisma.admin.create({
    data: {
      username: data.username,
      password: hashedPassword,
      email: data.email,
      name: data.name,
    },
  });

  return {
    status: true,
    message: "Admin created successfully",
    data: {
      id: newAdmin.id,
      username: newAdmin.username,
      email: newAdmin.email,
      name: newAdmin.name,
    },
  };
};


//* UPDATE 
export const SUpdateAdmin = async (
    id: number,
    data: Partial<{ username: string; password: string; email: string; name: string }>
): Promise<IGlobalResponse<IAdminResponse>> => {
    let updateData = { ...data };

    if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedAdmin = await prisma.admin.update({
        where: { id },
        data: updateData,
    });

    return {
        status: true,
        message: "Admin updated successfully",
        data: {
            id: updatedAdmin.id,
            username: updatedAdmin.username,
            email: updatedAdmin.email,
            name: updatedAdmin.name,
        },
    };
};

//* DELETE
export const SDeleteAdmin = async (
    id: number
): Promise<IGlobalResponse<null>> => {
    await prisma.admin.update({
        where: { id },
        data: {
            deletedAt: new Date(),
            isActive: false,
        },
    });

    return {
        status: true,
        message: "Admin soft deleted successfully",
        data: null,
    };
};
