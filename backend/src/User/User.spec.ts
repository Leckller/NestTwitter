import { Test, TestingModule } from "@nestjs/testing";
import UserService from "./User.Service";
import AuthModule from "../Auth/Auth.Module";
import UserEntity from "./User.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

const UserMockList: UserEntity[] = [
    new UserEntity({id: 1, name: "ruy"}),
    new UserEntity({id: 2, name: "morghana"}),
    new UserEntity({id: 3, name: "pablo"}),
]


describe('--- User Test ---', () => {

    let userService: UserService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOne: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn()
                    }
                }
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

    describe('Post - route: /user', async () => {

        

    })

})