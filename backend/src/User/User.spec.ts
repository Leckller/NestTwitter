import { Test, TestingModule } from "@nestjs/testing";
import UserService from "./User.Service";
import { UserRepositoryMock } from "../../test/User.Repository.Mock";
import AuthModule from "../Auth/Auth.Module";

describe('--- User Test ---', () => {

    let userService: UserService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                AuthModule,
                UserRepositoryMock   
            ],
            imports: [
                AuthModule,
            ]
        }).compile();

        // Faz a injeção do UserService
        userService = module.get<UserService>(UserService);

    });

    test("Service Defined", () => {

        expect(userService).toBeDefined()

    })

})