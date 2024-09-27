import { Provider } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { mock } from "node:test";
import UserEntity from "../src/User/User.Entity";

export const UserRepositoryMock: Provider = {
    provide: getRepositoryToken(UserEntity),
    useValue: {
        findOne: mock.fn(),
        create: mock.fn(),
        save: mock.fn()
    }
}